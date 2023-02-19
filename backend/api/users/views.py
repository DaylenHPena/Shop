from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated

from api.users.serializer import ProfileSerializer
from .serializer import RegisterUserSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework import views, status,generics
from rest_framework.generics import RetrieveAPIView
from users.models import User


class RegistrationView(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        reg_serializer = RegisterUserSerializer(data=request.data)
        if reg_serializer.is_valid():
            user = reg_serializer.save()
            if user:
                return Response(status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RetrieveUser(RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

@api_view(('GET',))
@permission_classes([IsAuthenticated])
def retrieve_profile(request):
    return Response(status=status.HTTP_200_OK, data=ProfileSerializer(request.user).data)

class RetrieveProfile(generics.ListAPIView):

    serializer_class = UserSerializer
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.request.user