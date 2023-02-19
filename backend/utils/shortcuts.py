from django.shortcuts import _get_queryset


def get_object_or_none(klass, *args, **kwargs):
    queryset = _get_queryset(klass)
    if not hasattr(queryset, 'get'):
        klass__name = klass.__name__ if isinstance(klass,
                                                   type) else klass.__class__.__name__
        raise ValueError(
            
                "First argument to get_object_or_none() must be a Model, Manager, "
                "or QuerySet, not '%s'." % klass__name
        )
    try:
        return queryset.get(*args, **kwargs)
    except queryset.model.DoesNotExist:
        return None


def call_method(o, name):
    return getattr(o, name)()

