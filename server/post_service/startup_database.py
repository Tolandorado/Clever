"""
    Скрипт предназначен для создания минимальной базы данных sqlite. Нужен при тестах на локалхосте, если не хочется разворачивать postgresql
"""

from models import app, db

if __name__ == "__main__":
    answer = ""
    while answer.lower() not in ["д", "н"]:
        answer = input("Создать базу данных sqlite? [д/н]: ")
        if answer.lower() == "д":
            with app.app_context():
                db.create_all()
                print("База данных создана")

    