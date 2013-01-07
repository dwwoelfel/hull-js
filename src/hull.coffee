define ['components/aura-express/lib/aura'], (Aura)->

  hull = null

  Hull = (config)->
    return hull if hull && hull.app
    hull = { config }
    hull.app = Aura(config)
    hull.app
        .use('extensions/aura-handlebars')
        .use('extensions/aura-backbone')
        .use('lib/ext/api')
        .use('lib/ext/auth')
        .use('lib/ext/widget')
        .start({ widgets: 'body' })
    return hull

  window.Hull = Hull
  Hull
