from models import *
from storage import write_post, read_post, delete_post

def failure(message = None):
    return jsonify({
        "response-suc": False,
        "message": message,
    })

def success(data = None):
    return jsonify({
        "response-suc": True,
        "data": data,
    })

@app.route("/api/post/create", methods=["POST",])
def api_create_post():
    try:
        try:
            # Получаем аргументы из запроса
            post_name = request.json.get("postName")
            posting_time = request.json.get("postingTime")
            author_name = request.json.get("authorName")
            author_id = request.json.get("authorId")
            vector = request.json.get("selectedVector")
            type = request.json.get("typeOf")
            content = request.json.get("content")
        except Exception as ex:
            print(ex)
            return failure(f"Не удалось прочитать данные в запросе ({request.json})")

        # Проверяем/получаем нужную таблицу
        table = get_table_by_type(type)
        if table is None:
            return failure(f"Типа {type} не существует")

        # Создаём экземпляр записи в таблице
        post: BasePost = table()

        try:
            # Записываем необходимую информацию в объект
            post.authorId = author_id
            post.authorName = author_name
            post.postName = post_name
            post.postingTime = posting_time
            post.type = type
            post.vector = vector

            # Пытаемся записать данные в таблицу
            db.session.add(post)
            db.session.flush()
        except Exception as ex:
            print(ex)
            db.session.rollback()
            return failure("Не удалось произвести запись в базу данных")

        # Прежде чем подтверждать запись в БД, нужно записать контент в файловую систему
        try:
            write_post(type, post.id, content)
        except Exception as ex:
            print(ex)
            db.session.rollback()
            return failure("Не получилось сохранить контент поста")

        # Подтверждаем изменения в базе данных
        db.session.commit()
        return success()

    except Exception as ex:
        print(ex)
        return failure("Что-то явно пошло не так, и я не знаю что именно!")

@app.route("/api/post/list", methods=["GET",])
def api_get_list_of_posts():
    try:
        try:
            # Получаем аргументы
            vectors = request.json.get("vectors")
            types = request.json.get("types")
        except Exception as ex:
            print(ex)
            return failure("Не вышло прочесть аргументы")

        # О, а вот тут будет храниться ответ =)
        response = []

        # Теперь банальным перебором будем вытаскивать записи из таблицы
        for type in types:
            # Получаем таблицу
            table = get_table_by_type(type)
            
            # Я тут так подумал, что список может быть и пустым, так что не страшно
            if table is None:
                continue

            # Теперь смотрим на вектора
            for vector in vectors:
                # Обращаемся к базе данных и вытягиваем необходимые нам записи
                post_list = db.session.query(table).filter_by(vector=vector).all()

                # Опять-таки при помощи банального перебора обрабатываем полученный список
                for post in post_list:
                    response.append({
                        "postName": post.postName,
                        "postingTime": post.postingTime,
                        "authorName": post.authorName,
                        "authorId": post.authorId,
                        "vector": post.vector,
                        "type": post.type,
                        "id": post.id,
                    })

            return success(response)

    except Exception as ex:
        print(ex)
        return failure("Произошло что-то немыслемое и необъяснимое, поэтому я не знаю причину ошибки")

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
            post = db.session.query(table).filter_by(id=int(id)).one()
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
            post: BasePost = db.session.query(table).filter_by(id=id).one()
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
            db.session.query(table).filter_by(id=id).delete()
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
        
        return success()

    except Exception as ex:
        print(ex)
        return failure("Кто-то или что-то очень могущественное явно против того, чтоб я обрабатывал этот запрос!")
