import { getPublishToken } from '@/api/publish/auth'

const TOKEN_KEY = 'AI-KG-TOKEN'
const SITE_TOKEN_KEY = 'AI-KG-SITE-TOKEN'

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const setToken = (token) => {
  return localStorage.setItem(TOKEN_KEY, token)
}

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export const getSiteToken = () => {
  const siteCode = globalThis.location.pathname.split('/').slice(-1)[0]
  const siteToken = localStorage.getItem(SITE_TOKEN_KEY) || JSON.stringify({})
  const siteTokenJson = JSON.parse(siteToken)
  return siteTokenJson[siteCode]
}

export const checkOrSetSiteToken = async () => {
  const siteCode = globalThis.location.pathname.split('/').slice(-1)[0]
  const siteToken = localStorage.getItem(SITE_TOKEN_KEY) || JSON.stringify({})
  const siteTokenJson = JSON.parse(siteToken)
  if (!siteTokenJson[siteCode]) {
    const res = await getPublishToken(siteCode)
    siteTokenJson[siteCode] = res.data
    localStorage.setItem(SITE_TOKEN_KEY, JSON.stringify(siteTokenJson))
  }
}

export const setSiteToken = (siteCode, token) => {
  const siteToken = localStorage.getItem(SITE_TOKEN_KEY) || JSON.stringify({})
  const siteTokenJson = JSON.parse(siteToken)
  siteTokenJson[siteCode] = token
  localStorage.setItem(SITE_TOKEN_KEY, JSON.stringify(siteTokenJson))
} 

export const removeSiteToken = () => {
  const siteCode = globalThis.location.pathname.split('/').slice(-1)[0]
  const siteToken = localStorage.getItem(SITE_TOKEN_KEY) || JSON.stringify({})
  const siteTokenJson = JSON.parse(siteToken)
  delete siteTokenJson[siteCode]
  localStorage.setItem(SITE_TOKEN_KEY, JSON.stringify(siteTokenJson))
}
