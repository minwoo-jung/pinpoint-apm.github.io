/**
 * Pinpoint gitbook template engine
 * Copyright 2021-present NAVER Corp.
 * Apache License v2.0
 */

const axios = require('axios')


const whatsNewTempate = `# What's New in v__VERSION__
__BODY__
`
class MarkdownContents {
    async markdownContentsFromPinpointGithub(fileName) {
        const { data } = await axios.get(`https://raw.githubusercontent.com/pinpoint-apm/pinpoint/master/doc/${fileName}`, { responseType: 'text' })
        return data
    }

    async markdownContentsFromPinpointLatestReleaseNotes() {
        const data = await this.getLatestReleaseNotes()
        const tagName = data.tag_name.startsWith('v') ? data.tag_name.substring(1) : data.tag_name
        const latestReleaseNotes = whatsNewTempate.replace('__VERSION__', tagName)
            .replace('__BODY__', data.body)
        return latestReleaseNotes
    }

    async getLatestReleaseNotes() {
        const { data } = await axios.get(`https://api.github.com/repos/pinpoint-apm/pinpoint/releases/latest`)
        return data
    }
}

module.exports = MarkdownContents