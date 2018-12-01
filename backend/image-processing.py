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
cv2.imshow("Original Image", image)
cv2.waitKey(0)


# Instantiates a GCP client
client = vision.ImageAnnotatorClient()

# The name of the image file to annotate
file_name = os.path.join(
    os.path.dirname(__file__),
    'images/park.jpg')

# Loads the image into memory
with io.open(file_name, 'rb') as image_file:
    content = image_file.read()

google_image = types.Image(content=content)

# Performs label detection on the image file
response = client.label_detection(image=google_image)
labels = response.label_annotations

print('Labels:')
for label in labels:
    print(label.description)


#original height and width
height, width = image.shape[:2]
print (image.shape)

#top left quadrant
start_row, start_col = int(0), int(0)
end_row, end_col = int(height * 0.5), int(width * 0.5)
cropped_top_left = image[start_row:end_row , start_col:end_col]
print (f'{start_row} + {end_row}')
print (f'{start_col} + {end_col}')

cv2.imshow("Cropped Top Left", cropped_top_left)
cv2.waitKey(0)
cv2.destroyAllWindows()

#top right quadrant
start_row, start_col = int(0), int(width * 0.5)
end_row, end_col = int(height * 0.5), int(width)
cropped_top_right = image[start_row:end_row , start_col:end_col]
print (f'{start_row} + {end_row}')
print (f'{start_col} + {end_col}')

cv2.imshow("Cropped Top Right", cropped_top_right)
cv2.waitKey(0)
cv2.destroyAllWindows()

#bottom left quadrant
start_row, start_col = int(height * 0.5), int(0)
end_row, end_col = int(height), int(width * 0.5)
cropped_bot_left = image[start_row:end_row , start_col:end_col]
print (f'{start_row} + {end_row}')
print (f'{start_col} + {end_col}')

cv2.imshow("Cropped Bot Left", cropped_bot_left)
cv2.waitKey(0)
cv2.destroyAllWindows()

#top right quadrant
start_row, start_col = int(height * 0.5), int(width * 0.5)
end_row, end_col = int(height), int(width)
cropped_bot_right = image[start_row:end_row , start_col:end_col]
print (f'{start_row} + {end_row}')
print (f'{start_col} + {end_col}')

cv2.imshow("Cropped Bot Right", cropped_bot_right)
cv2.waitKey(0)
cv2.destroyAllWindows()

cropped_top_left.size
cropped_top_right.size
cropped_bot_left.size
cropped_bot_right.size
