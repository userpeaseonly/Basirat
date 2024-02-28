from django.contrib import admin
from .models import Test, Question, MultipleChoiceOption, TextAnswer

admin.site.register(Test)
admin.site.register(Question)
admin.site.register(MultipleChoiceOption)
admin.site.register(TextAnswer)
