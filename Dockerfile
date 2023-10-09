FROM python:3.10-slim

ENV PYTHONBUFFERED 1
ENV TZ='Europe/Moscow'

WORKDIR /project

COPY app.py /project/
COPY requirements.txt /project/

RUN pip3 install -r requirements.txt

CMD python3 -m uvicorn app:app --reload --host 0.0.0.0