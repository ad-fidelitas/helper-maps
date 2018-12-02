#!/bin/bash

cd $1

imgNames=$(ls | grep -E ".jpg|.JPG" | tr "\n" " ")
echo $imgNames

for imgName in $imgNames
do
    curl -F "file=@$imgName" localhost:3000/upload
done
