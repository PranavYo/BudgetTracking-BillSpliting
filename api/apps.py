from django.apps import AppConfig


class ApiConfig(AppConfig):
    # default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        import api.signals


# class ViewFriendsConfig(AppConfig):
#     name = ''

    # def ready(self):
        # import friends.signals
