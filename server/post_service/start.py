from routes import *
import sys

if __name__ == "__main__":
    if len(sys.argv) < 2:
        app.run("localhost", 5000, debug=True)
    elif len(sys.argv) == 2:
        if  sys.argv[1] == "dev":
            app.run("0.0.0.0", 5000, debug=True)
        elif  sys.argv[1] == "ndev":
            app.run("0.0.0.0", 5000, debug=False)
        else:
            print(f"Неизвестный ключ <{sys.argv[1]}>\nПопробуйте dev или ndev")
    else:
        print("Неверно заданы ключи\nПопробуйте start-d или start")