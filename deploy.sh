

npm run build
gcloud auth activate-service-account --key-file=google-cloud-platform-service-account-key.json
PROJECT=vietnamese-english
gcloud app deploy -q --project=$PROJECT 
gcloud app browse --project=$PROJECT
gcloud app logs tail -s default --project=$PROJECT 