import os
import shutil
import json
import uvicorn
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from concurrent.futures import ThreadPoolExecutor
from parser.ventu_parser import VentuskyParser

executor = ThreadPoolExecutor()

static_path = 'screenshots'
zip_path = 'images.zip'


with open('config.json', 'r', encoding='utf-8') as f:
    configs = json.load(f)

app = FastAPI()
app.state.selenium_status = 'free'

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def run_driver(days):
    for location, params in configs.items():
        driver = VentuskyParser(screenshots_dir=os.path.abspath(static_path),
                                location=location,
                                params=params,
                                fInterval=days)
        driver.launch_driver()
    app.state.selenium_status = 'free'


def clear_static():
    if os.path.exists(static_path):
        shutil.rmtree(static_path)
    os.makedirs(static_path)

@app.get("/ping")
async def ping() -> dict:
    return {"Success": True}

@app.get("/")
async def mainpage() -> str:
    return "YOU ARE ON THE MAIN PAGE"

@app.get("/files")
async def files() -> dict:
    res = {}
    files = os.scandir(os.path.join(os.getcwd(), static_path))
    for file in files:
        if file.is_file():
            key = '__'
            val = res.get(key, [])
            val.append(file.name)
            res[key] = sorted(val)
        else:
            key = file.name
            res[key] = []
            sub_files = os.scandir(file.path)
            for sf in sub_files:
                if sf.is_file():
                    res[key].append(sf.name)
                    res[key].sort()

    return res

@app.get("/start")
async def start(days: int = 3) -> dict:
    if app.state.selenium_status == 'free':
        app.state.selenium_status = 'busi'
        clear_static()
        executor.submit(run_driver, days)
        return {"Selenium": "Start"}
    else: 
        return {"Selenium": "Still working"}


@app.get("/zip")
async def create_zip_archive():
    if os.path.exists(zip_path):
        os.remove(zip_path)
    shutil.make_archive(zip_path.split('.')[0], 'zip', static_path)
    return FileResponse(path=zip_path,
                        filename=zip_path,
                        media_type='multipart/form-data')


if __name__ == "__main__":
    uvicorn.run(app, host='0.0.0.0', port=4400)
