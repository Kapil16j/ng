import { motion } from 'framer-motion';
import clsx from 'clsx';
import React from 'react';
import parse, { domToReact } from 'html-react-parser';

const ChatMessage = ({ text, isFromUser, useInnerHTML }) => {
  const messageClasses = clsx(
    'p-2 rounded-lg shadow-md',
    {
      'bg-blue-200 text-blue-800 self-start': isFromUser,
      'bg-gray-200 text-gray-800 self-end': !isFromUser,
    }
  );

  const renderTextContent = (text) => {
    const words = text.split(' ');
    return (
      <p className="text-sm">
        {words.map((word, index) => (
          <motion.span
            key={index}
            style={{ display: 'inline-block', marginRight: '0.25rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.25 }}
          >
            {word}
          </motion.span>
        ))}
      </p>
    );
  };

  const renderHTMLContent = (html) => {
    const options = {
      replace: (domNode) => {
        if (domNode.type === 'text') {
          const words = domNode.data.split(' ').map((word, index) => (
            <motion.span
              key={index}
              style={{ display: 'inline-block', marginRight: '0.25rem' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.25 }}
            >
              {word}
            </motion.span>
          ));
          return <>{words}</>;
        }
        return domToReact(domNode.children, options);
      },
    };
    return <p className="text-sm">{parse(html, options)}</p>;
  };

  const renderContent = () => {
    if (useInnerHTML) {
      return renderHTMLContent(text);
    } else {
      return renderTextContent(text);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={messageClasses}
    >
      {renderContent()}
    </motion.div>
  );
};

export default ChatMessage;
