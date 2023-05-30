from django.http import HttpResponse

def index(request):
    return HttpResponse('index')

def home(request):
    return HttpResponse('home')

def cost(request):
    return HttpResponse('cost')