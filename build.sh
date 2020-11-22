npm run build

rm /srv/frontend/ -rf
mkdir /srv/frontend

mv ./build/* /srv/frontend/
