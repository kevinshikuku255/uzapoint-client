import React from 'react';
import {Input, Label,Icon} from "semantic-ui-react"




/**
 * Component for uploading post image
 */
const PostImageUpload = ({ handleChange, label }) => (
  <>
  <Label htmlFor="post-image">
    <Input
      name="image"
      onChange={handleChange}
      type="file"
      id="post-image"
      accept="image/x-png,image/jpeg"
    />


      <Icon name="image"/>

      {/* {label && <Spacing left="xs">{label}</Spacing>} */}
    </Label>
  </>
);

export default PostImageUpload;
