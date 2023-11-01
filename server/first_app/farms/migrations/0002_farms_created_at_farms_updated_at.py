# Generated by Django 4.2.6 on 2023-10-31 23:54

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ("farms", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="farms",
            name="created_at",
            field=models.DateTimeField(
                auto_now_add=True, default=django.utils.timezone.now
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="farms",
            name="updated_at",
            field=models.DateTimeField(auto_now=True),
        ),
    ]
