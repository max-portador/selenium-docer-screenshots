FROM python:3.11.1-alpine3.17

ENV PYTHONBUFFERED 1
RUN pip install --upgrade pip
RUN pip install uvicorn envparse fastapi selenium starlette Pillow
RUN mkdir /app

COPY ./app /app
WORKDIR /app
ENTRYPOINT [ "sh", "entrypoint.sh" ]
