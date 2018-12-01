import cv2
import numpy

pathToImage = "./images/park.jpg"

image = cv2.imread(pathToImage)
cv2.imshow("Original Image", image)
cv2.waitKey(0)

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
