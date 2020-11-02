FROM python:3.8-slim
ENV PYTHONUNBUFFERED=1 DEBUG_MODE=${DEBUG_MODE:-FALSE}

WORKDIR /code
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .

EXPOSE 80

CMD [ "gunicorn", "-w 3", "-b 0.0.0.0:80", "meetm.wsgi" ]