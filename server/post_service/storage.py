import os
import json

# Всё (абсолютно) здесь может выдать ошибку, поэтому нужно юзать совместно с try-except =)

def write_post(type: str, id: int, content: dict):
    with open(f"{type}/{id}.json", "w") as content_file:
        content_file.write(json.dumps(content))

def read_post(type: str, id: int):
    content = None
    with open(f"{type}/{id}.json", "r") as content_file:
        content = json.loads(content_file.read())
    return content

def delete_post(type: str, id: int):
    os.remove(f"{type}/{id}.json")

def get_image(type: str, id: int):
    content = None
    with open(f"{type}/{id}.json", "r") as content_file:
        content = json.loads(content_file.read())
    return content["mediaContent"]["selectedFile"]