import os

def search_dir(dir_path, search_str):
    for root, _, files in os.walk(dir_path):
        for file in files:
            if not file.endswith(('.js', '.jsx', '.ts', '.tsx')):
                continue
            file_path = os.path.join(root, file)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    for i, line in enumerate(f):
                        if search_str in line:
                            print(f"{file_path}:{i+1}:{line.strip()}")
            except Exception:
                pass

search_dir('src', 'data-cursor')
