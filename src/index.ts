import semver from 'semver'
import osLocale from 'os-locale'
import { PLUGIN_NAME, PLUGIN_DISPLAY, PLUGIN_MINIMUM_VERSION } from './constants'
import { config } from './config'
import { uploader } from './uploader'
import { en, zhCN, zhTW } from './locale'
import type { PicGo, IPicGoPluginInterface } from 'picgo'

export = function (ctx: PicGo): IPicGoPluginInterface {
  // check minimum version
  checkVersion(ctx.VERSION)

  const register = (): void => {
    ctx.i18n.addLocale('en', en)
    ctx.i18n.addLocale('zh-CN', zhCN)
    ctx.i18n.addLocale('zh-TW', zhTW)


    ctx.helper.uploader.register(PLUGIN_NAME, { name: PLUGIN_DISPLAY, handle: uploader, config })
  }

  return {
    register,
    config,
    uploader: PLUGIN_NAME,
  }
}

function checkVersion(version?: string): void {
  if (version && semver.gte(version, PLUGIN_MINIMUM_VERSION)) return

  const locale = osLocale.sync()
  const getErrorMessage = (message: string): string =>
    message.replace('${pluginName}', PLUGIN_DISPLAY).replace('${version}', PLUGIN_MINIMUM_VERSION)

  let errorMessage = getErrorMessage(en.PLUGIN_VERSION_ERROR)

  if (locale) {
    const [lang, region] = locale.split(/[-_]/g)

    // for Chinese
    if (`${lang}`.toLowerCase() === 'zh') {
      errorMessage = getErrorMessage(
        (`${region}`.toUpperCase() === 'TW' ? zhTW : zhCN).PLUGIN_VERSION_ERROR
      )
    }
  }

  throw new Error(errorMessage)
}
