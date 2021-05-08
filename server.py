import io
import os

# Imports the Google Cloud client library
from google.cloud import vision

os.system("set GOOGLE_APPLICATION_CREDENTIALS=G:\Projects\JoesKitchen\joes-kitchen-82be5b3de94a.json")

file_name = os.path.abspath('assets/foodtest2.jpg')

def localize_objects(path):
  """Localize objects in the local image.

  Args:
  path: The path to the local file.
  """
  client = vision.ImageAnnotatorClient()

  with open(path, 'rb') as image_file:
      content = image_file.read()
  image = vision.Image(content=content)

  objects = client.object_localization(
      image=image).localized_object_annotations

  print('Number of objects found: {}'.format(len(objects)))
  for object_ in objects:
      print('\n{} (confidence: {})'.format(object_.name, object_.score))
      print('Normalized bounding polygon vertices: ')
      for vertex in object_.bounding_poly.normalized_vertices:
          print(' - ({}, {})'.format(vertex.x, vertex.y))

localize_objects(file_name)