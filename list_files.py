import os

def search_dir(dir_path):
    for root, _, files in os.walk(dir_path):
        for file in files:
            print(os.path.join(root, file))

search_dir('src')
