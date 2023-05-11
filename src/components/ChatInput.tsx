import { useState } from "react";
import { Button, Flex, MediaQuery, Textarea } from "@mantine/core";
import { AiOutlineSend } from "react-icons/ai";

export function ChatInput(
  {chatId, submitting, onSubmit} 
    : 
  {chatId: string, submitting: boolean, onSubmit: (a: string) => void}
) {
  const [content, setContent] = useState("");

  const submit = async () => {
    if (content.trim().length === 0) {
      return;
    }
    onSubmit(content);
    setContent("");
  };

  return (    
    <Flex gap="sm">
      <Textarea
        key={chatId}
        sx={{ flex: 1 }}
        placeholder="Your message here..."
        autosize
        autoFocus
        disabled={submitting}
        minRows={1}
        maxRows={5}
        value={content}
        onChange={(event) => setContent(event.currentTarget.value)}
        onKeyDown={async (event) => {
          if (event.code === "Enter" && !event.shiftKey) {
            event.preventDefault();
            submit();
          }
        }}        
      />
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Button h="auto" onClick={submit}>
          <AiOutlineSend />
        </Button>
      </MediaQuery>
    </Flex>    
  );
}
