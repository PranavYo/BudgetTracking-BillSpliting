# Generated by Django 3.2.7 on 2023-02-02 16:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_addbudget'),
    ]

    operations = [
        migrations.CreateModel(
            name='SinglePayBudget',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.IntegerField(default=0)),
                ('budgetForSinglePay', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='budgetForSinglePay', to='api.budget')),
            ],
        ),
    ]
