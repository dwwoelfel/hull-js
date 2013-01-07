define ->

  authenticating = false

  (env)->

    sandbox = env.sandbox
    core    = env.core

    init: ->

      sandbox.authenticating = ->
        authenticating

      sandbox.authComplete =->
        try
          return unless authenticating.state() == 'pending'
          providerName = authenticating.providerName
          dfd = authenticating
          me = sandbox.data.api.model('me')
          dfd.done -> me.trigger('change')
          me.fetch(success: dfd.resolve, error: dfd.reject, silent: true)
        catch err
          console.warn "Error on auth promise resolution", err
        finally
          authenticating = false


      sandbox.login = (providerName, opts, callback=->)->

        return if authenticating

        providerName = providerName && providerName.toLowerCase()
        return unless providerName

        authenticating = sandbox.data.deferred()
        authenticating.providerName = providerName
        authenticating.done callback if _.isFunction(callback)

        auth_url = "#{core.config.orgUrl}/auth/#{providerName.toLowerCase()}"
        auth_params = opts || {}
        auth_params.app_id        = core.config.appId
        auth_params.callback_url  = core.config.callback_url || document.location.toString()

        auth_params.auth_referer  = document.location.toString()
        auth_url += "?#{$.param(auth_params)}"

        window.open(auth_url, "_auth", 'location=0,status=0,width=990,height=600')

        authenticating


      sandbox.logout = (callback=->)->
        dfd = sandbox.data.api('hull/logout')
        dfd.done ->
          sandbox.data.api.model('me').clear()
          sandbox.data.api.model.clearAll()
          callback() if _.isFunction(callback)
        dfd
