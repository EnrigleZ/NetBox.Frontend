git pull origin

yarn
yarn build

rm /srv/frontend/ -rf
mkdir /srv/frontend

mv ./build/* /srv/frontend/
