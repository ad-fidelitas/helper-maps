import asyncio
import sys

#for opencv
import cv2
import numpy

#for GCP
import io
import os

# Imports the Google Cloud client library
from google.cloud import vision
from google.cloud.vision import types

if len(sys.argv) != 2:
    raise "ERROR: expects one argument (the image file's name)"
# arg format: 'imagename.jpg'
pathToImage = "images/" + sys.argv[1]

image = cv2.imread(pathToImage)
#cv2.imshow("Original Image", image)
cv2.waitKey(0)


#original height and width
height, width = image.shape[:2]

#top left quadrant
start_row, start_col = int(0), int(0)
end_row, end_col = int(height * 0.5), int(width * 0.5)
cropped_top_left = image[start_row:end_row , start_col:end_col]
#print (f'{start_row} + {end_row}')
#print (f'{start_col} + {end_col}')

#cv2.imshow("Cropped Top Left", cropped_top_left)
cv2.imwrite("images/img1.jpg", cropped_top_left)
cv2.waitKey(0)
cv2.destroyAllWindows()

#top right quadrant
start_row, start_col = int(0), int(width * 0.5)
end_row, end_col = int(height * 0.5), int(width)
cropped_top_right = image[start_row:end_row , start_col:end_col]

#cv2.imshow("Cropped Top Right", cropped_top_right)
cv2.imwrite("images/img2.jpg", cropped_top_right)
cv2.waitKey(0)
cv2.destroyAllWindows()

#bottom left quadrant
start_row, start_col = int(height * 0.5), int(0)
end_row, end_col = int(height), int(width * 0.5)
cropped_bot_left = image[start_row:end_row , start_col:end_col]

#cv2.imshow("Cropped Bot Left", cropped_bot_left)
cv2.imwrite("images/img3.jpg", cropped_bot_left)
cv2.waitKey(0)
cv2.destroyAllWindows()

#top right quadrant
start_row, start_col = int(height * 0.5), int(width * 0.5)
end_row, end_col = int(height), int(width)
cropped_bot_right = image[start_row:end_row , start_col:end_col]

#cv2.imshow("Cropped Bot Right", cropped_bot_right)
cv2.imwrite("images/img4.jpg", cropped_bot_right)
cv2.waitKey(0)
cv2.destroyAllWindows()

#GCP IMAGE API CALLS:
# Instantiates a GCP client
client = vision.ImageAnnotatorClient()

async def callGoogle(path):
    # The name of the image file to annotate
    file_name = os.path.join(
        os.path.dirname(__file__),
        path)

    # Loads the image into memory
    with io.open(file_name, 'rb') as image_file:
        content = image_file.read()

    google_image = types.Image(content=content)

    # Performs label detection on the image file
    labelList = []
    response = client.label_detection(image=google_image)
    labels = response.label_annotations
    for label in labels:
        labelList.append(label.description)
    #print(labelList)
    return labelList

async def precall():
    img1 = loop.create_task(callGoogle("images/img1.jpg"))
    img2 = loop.create_task(callGoogle("images/img2.jpg"))
    img3 = loop.create_task(callGoogle("images/img3.jpg"))
    img4 = loop.create_task(callGoogle("images/img4.jpg"))
    return img1, img2, img3, img4

try:
    loop = asyncio.get_event_loop()
    result = loop.run_until_complete(precall())
    accessScore = 0
    for res in result:
        labelArray = res.result()
        if 'stairs' in labelArray:
            accessScore = accessScore + 1
        if 'ramp' in labelArray:
            accessScore = accessScore - 1
    print(accessScore)
    sys.stdout.flush()
except Exception as e:
    print(e)


