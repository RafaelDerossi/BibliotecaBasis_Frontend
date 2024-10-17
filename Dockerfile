FROM node:14.17.6 As builder

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --force 
    
COPY . .
RUN npm run build

RUN node --max_old_space_size=8192 node_modules/@angular/cli/bin    /ng build --configuration production --output-hashing=all
    
FROM nginx:1.15.8-alpine
    
COPY --from=builder /usr/src/app/dist/condominioapp/ /usr/share/nginx/html
    