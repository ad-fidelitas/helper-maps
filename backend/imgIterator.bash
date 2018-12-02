#!/bin/bash

cd $1

imgNames=$(ls | grep -E ".jpg|.JPG" | tr "\n" " ")

for imgName in $imgNames
do
    newImgName=$(echo $imgName | tr ".JPG" ".jpg") 
    mv $imgName $newImgName
    curl -F "file=@$newImgName" localhost:3000/upload
done