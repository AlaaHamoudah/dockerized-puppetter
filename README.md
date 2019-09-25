# DOCKERIZED PUPPETEER! :whale:

Build the images:
`docker-compose build`

Run chrome and app services:
`docker-compose up -d chrome app`

In another tab, run the pusher service 
`docker-compose up -d  pusher`

To exec inside the app container 
` docker-compose exec app /bin/sh` change directory to src, you can see the print.pdf file

Once pusher pushes the notifaction, a pdf file will be printed!
