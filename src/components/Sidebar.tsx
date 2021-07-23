import React, { useState, useEffect } from 'react';
import { List, ListItem, Note } from '@contentful/forma-36-react-components';
import { SidebarExtensionSDK } from '@contentful/app-sdk';
import readingTime from 'reading-time';

interface SidebarProps {
  sdk: SidebarExtensionSDK;
}

const CONTENT_FIELD_ID = 'tinyMceField';

const Sidebar = (props: SidebarProps) => {
  const { sdk } = props;

  const contentField = sdk.entry.fields[CONTENT_FIELD_ID];

  const [blogText, setBlogText] = useState(contentField.getValue());

  // Listen for onChange events and update the value
  useEffect(() => {
    const detach = contentField.onValueChanged((value) => {
      setBlogText(value);
    });
    return () => detach();
  }, [contentField]);

  // Calculate the metrics based on the new value
  const stats = readingTime(blogText || '');

  // Render the metrics with Forma36 components
  return (
    <>
      <Note style={{ marginBottom: '12px' }}>
        Metrics for your blog post:
        <List style={{ marginTop: '12px' }}>
          <ListItem>Word count: {stats.words}</ListItem>
          <ListItem>Reading time: {stats.text}</ListItem>
        </List>
      </Note>
    </>
  );
};

export default Sidebar;