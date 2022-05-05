cd django-todolist && sudo source my_env/bin/activate
sudo pip3 install -r requirements.txt -y
sudo python manage.py migrate
python manage.py runserver 0.0.0.0:8080 > /dev/null 2>&1 &