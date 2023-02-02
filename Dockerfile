FROM tiangolo/node-frontend:10 as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . ./

RUN npm run build

FROM nginx:1.17.4-alpine


RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build/ /etc/nginx/html
COPY ./config/nginx/prod/nginx.conf /etc/nginx/conf.d
