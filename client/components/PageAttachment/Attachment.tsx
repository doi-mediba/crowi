import React from 'react'
import Icon from 'components/Common/Icon'
import User from 'components/User/User'
import { Attachment as AttachmentType } from 'client/types/crowi'

interface Props {
  attachment: AttachmentType
  inUse: boolean
  onAttachmentDeleteClicked: Function
}

export default class Attachment extends React.Component<Props> {
  constructor(props) {
    super(props)

    this._onAttachmentDeleteClicked = this._onAttachmentDeleteClicked.bind(this)
  }

  iconNameByFormat(format) {
    if (format.match(/image\/.+/i)) {
      return 'file-image'
    }

    return 'file'
  }

  _onAttachmentDeleteClicked(event) {
    this.props.onAttachmentDeleteClicked(this.props.attachment)
  }

  render() {
    const attachment = this.props.attachment
    const formatIcon = this.iconNameByFormat(attachment.fileFormat)

    const fileInUse = this.props.inUse ? <span className="attachment-in-use badge badge-info">In Use</span> : ''

    const fileType = <span className="attachment-filetype badge badge-secondary">{attachment.fileFormat}</span>

    return (
      <li>
        <User user={attachment.creator} />
        <Icon name={formatIcon} regular />

        <a href={attachment.url}> {attachment.originalName}</a>

        {fileType}

        {fileInUse}

        <a className="text-danger attachment-delete" onClick={this._onAttachmentDeleteClicked}>
          <Icon name="trash" solid />
        </a>
      </li>
    )
  }
}