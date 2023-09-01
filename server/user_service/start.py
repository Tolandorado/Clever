from user_service import *

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    
    app.run("0.0.0.0", 5000, debug=True)