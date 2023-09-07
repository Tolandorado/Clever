from models import *
from storage import write_post, read_post, delete_post, get_image

import random
import base64
import pickle
from pprint import pprint


def failure(message = None):
    return jsonify({
        "response-suc": False,
        "message": message,
    })

def success(data = None, *, x_total_count=False):
    _data = jsonify({
        "response-suc": True,
        "data": data,
    })

    if x_total_count:
        _data.headers["X-Total-Count"] = len(data)

    return _data

@app.route("/api/test", methods=["POST",])
def api_test():
    post_name = request.form['postName']
    posting_time = request.form['postingTime']
    author_name = request.form['authorName']
    author_id = request.form['authorId']
    selected_vector = request.form['selectedVector']
    description = request.form.get('content[description]')

    # Обработка полей формы
    # ...
    print(request.files)

    # Обработка файлов из FormData
    if 'image' in request.files:
        file = request.files['image']
        print("РАБОТАЕТ")
    else: print("НЕ РАБОТАЕТ")

    return jsonify({"response-suc":True})

@app.route("/api/post/create", methods=["POST",])
def api_create_post():
    try:
        try:
            pprint(request.get_json())
            image = request.files['image']
            print("\033[31m",image,"\033[0m")

            # Получаем аргументы из запроса
            post_name = request.form.get("postName")
            posting_time = request.form.get("postingTime")
            author_name = request.form.get("authorName")
            author_id = request.foem.get("authorId")
            vector = request.form.get("selectedVector")
            type_of = request.form.get("typeOf")
            content = request.form.get("content")

            image = None
            if 'image' in request.files:
                image = request.files['image']
            else:
                print("Нет фотографии")
                return failure("Отсутствует фотография")


            check = [post_name, posting_time, author_name, author_id, vector, type_of, content]
            if None in check:
                print(check)
                return failure("Что-то пусто")
        except Exception as ex:
            print(ex)
            return failure(f"Не удалось прочитать данные в запросе ({request.json})")

        # Проверяем/получаем нужную таблицу
        table = get_table_by_type(type_of)
        if table is None:
            return failure(f"Типа {type_of} не существует")

        # Создаём экземпляр записи в таблице
        post: BasePost = table()

        try:
            # Записываем необходимую информацию в объект
            post.authorId = author_id
            post.authorName = author_name
            post.postName = post_name
            post.postingTime = posting_time
            post.type = type_of
            post.vector = vector

            # Пытаемся записать данные в таблицу
            db.session.add(post)
            db.session.flush()
        
            post.postId = type_of[0].lower() + str(post.id)
        except Exception as ex:
            print(ex)
            db.session.rollback()
            return failure("Не удалось произвести запись в базу данных")
        
        # Прежде чем подтверждать запись в БД, нужно записать контент в файловую систему
        try:
            write_post(type_of, post.postId, content)
        except Exception as ex:
            print(ex)
            db.session.rollback()
            return failure("Не получилось сохранить контент поста")

        # Теперь сохраняем превьюшку
        try:
            image.save(f"../../previews/{post.postId}.jpg")
        except Exception as ex:
            print(ex)
            db.session.rollback()
            return failure("Не получилось сохранить изображение")

        # Подтверждаем изменения в базе данных
        db.session.commit()
        return success()
    except Exception as ex:
        print(ex)
        return failure("Что-то явно пошло не так, и я не знаю что именно!")

@app.route("/api/post/preview/<string:post_id>")
def api_get_preview(post_id):
    return send_file(f"../../previews/{post_id}.jpg", mimetype="image/jpeg")

@app.route("/api/post/refresh")
def api_refresh():
    posts = []
    for table in ALLOWED_TYPES.values():
        posts += db.session.query(table).all()
    random.shuffle(posts)
    session['random_posts_list'] = posts
    return success()

@app.route("/api/post/list/random/<int:limit>/<int:page>", methods=["GET"])
def api_get_list_of_posts_random_limited(limit, page):
    try:
        if limit <= 0:
            return failure("Лимит постов должен быть больше нуля")
        if page < 0:
            return failure("Номер страницы не может быть меньше нуля")
        page -= 1

        posts = []
        posts_list = session.get('random_posts_list', None)

        if posts_list is None:
            return failure("Обновите список")

        if page >= len(posts_list) / limit:
            print(f"page: {page} len-posts: {len(posts)} limit: {limit}")
            return failure("Такой страницы не существует")

        page_start = page * limit
        page_end = page_start + limit
        if page_end > len(posts_list):
            page_end = len(posts_list)

        for post in posts_list[page_start:page_end]:
            posts.append({
                "postName": post.postName,
                "postingTime": post.postingTime,
                "authorName": post.authorName,
                "authorId": post.authorId,
                "vector": post.vector,
                "type": post.type,
                "id": post.postId,
            })

        response = jsonify({"post-list": posts, "x-total-count": len(posts_list)})
        return response
    except Exception as e:
        return failure(str(e))

@app.route("/api/post/list/all", methods=["GET",])
def api_get_list_of_all_posts():
    try:
        response = []
        for table in ALLOWED_TYPES.values():
            posts = db.session.query(table).all()
            for post in posts:
                response.append({
                    "postName": post.postName,
                    "postingTime": post.postingTime,
                    "authorName": post.authorName,
                    "authorId": post.authorId,
                    "vector": post.vector,
                    "type": post.type,
                    "id": post.postId,
                })
        return success(response)

    except Exception as ex:
        print(ex)
        return failure("Вот прям совсем никак не обрабатывается")

@app.route("/api/post/get", methods=["GET",])
def api_get_post():
    try:
        try:
            # Получаем аргументы (опять)
            type = request.json.get("typeOf")
            id = request.json.get("postId")
        except Exception as ex:
            print(ex)
            return failure("Не получается прочесть аргументы")

        # Получение информации о посте и проверка на существование
        table = get_table_by_type(type)
        if table is None:
            return failure(f"Типа {type} не существует")
        
        try:
            post = db.session.query(table).filter_by(postId=int(id)).one()
        except Exception as ex:
            print(ex)
            return failure(f"Запись с id {id} не найдена")
        
        # Тут мы уже формируем ответ
        response = {
            "postName": post.postName,
            "postingTime": post.postingTime,
            "authorName": post.authorName,
            "authorId": post.authorId,
            "vector": post.vector,
            "type": post.type,
            "id": post.id,
        }

        # А тут ищем уже сам пост
        try:
            content = read_post(type, id)
        except Exception as ex:
            print(ex)
            return failure("Не вышло прочесть содержимое поста")
        
        response["content"] = content
        return success(response)

    except Exception as ex:
        print(ex)
        return failure("О нееет, какая-то неведомая сила не даёт мне обработать запрос!")

@app.route("/api/post/update", methods=["PUT",])
def api_update_post():
    try:
        try:
            type = request.json.get("typeOf")
            id = request.json.get("postId")
            post_name = request.json.get("postName")
            content = request.json.get("content")
        except Exception as ex:
            print(ex)
            return failure("Не выходит прочесть аргументы")
        
        # Получение информации о посте и проверка на существование
        table = get_table_by_type(type)
        if table is None:
            return failure(f"Типа {type} не существует")
        
        try:
            post: BasePost = db.session.query(table).filter_by(postId=id).one()
        except Exception as ex:
            print(ex)
            return failure(f"Запись с id {id} не найдена")
        
        try:
            # Изменение таблицы
            post.postName = post_name
            db.session.flush()
        except Exception as ex:
            print(ex)
            db.session.rollback()
            return failure("Не получилось обновить запись о посте")

        # Опять-таки, прежде чем коммитить, обновим и контент
        try:
            write_post(type, id, content)
        except Exception as ex:
            print(ex)
            db.session.rollback()
            return failure("Не вышло обновить контент")
        
        # Вроде на этом всё
        db.session.commit()
        return success()

    except Exception as ex:
        print(ex)
        return failure("Слишком сложна, я не могу обработать запрос!")

@app.route("/api/post/delete", methods=["DELETE"])
def api_delete_post():
    try:
        try:
            type = request.json.get("typeOf")
            id = request.json.get("postId")
        except Exception as ex:
            print(ex)
            return failure("Не вышло прочесть аргументы")
        
        # Получение информации о посте и проверка на существование
        table = get_table_by_type(type)
        if table is None:
            return failure(f"Типа {type} не существует")

        try:
            db.session.query(table).filter_by(postId=id).delete()
            db.session.flush()
        except Exception as ex:
            print(ex)
            db.session.rollback()
            return failure("Не вышло удалить запись")
        
        # Удаление контента
        try:
            delete_post(type, id)
        except Exception as ex:
            print(ex)
            return failure("Не удалось удалить контент")
        
        db.session.commit()
        return success()

    except Exception as ex:
        print(ex)
        return failure("Кто-то или что-то очень могущественное явно против того, чтоб я обрабатывал этот запрос!")