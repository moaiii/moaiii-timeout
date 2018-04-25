#saving work to github
git add .
git commit -m "deploying"
git push

#echo Buildilng files
npm run build

#Deploying to AWS S3 bucket
aws s3 sync build/ s3://moaiii-timeout