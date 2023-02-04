from django.contrib import admin

# Register your models here.

from .models import Note, ViewFriends, AddFriends, Budget, AddBudget, SinglePayBudget, SplitPayBudget


admin.site.register(Note)
admin.site.register(ViewFriends)
admin.site.register(AddFriends)
admin.site.register(Budget)
admin.site.register(AddBudget)
admin.site.register(SinglePayBudget)
admin.site.register(SplitPayBudget)
