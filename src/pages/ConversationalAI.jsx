import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import {
  MessageSquare,
  Send,
  Bot,
  User,
  Plus,
  Trash2,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Navbar from '@/components/Layout/Navbar';
import Sidebar from '@/components/Layout/Sidebar';
import { addMessage, startNewConversation } from '@/store/slices/aiSlice';
import { toast } from '@/components/ui/use-toast';

const ConversationalAI = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const { currentConversation, conversations } = useSelector((state) => state.ai);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages]);

  useEffect(() => {
    if (!currentConversation && conversations.length === 0) {
      dispatch(startNewConversation({ title: 'Security Analysis Chat' }));
    }
  }, [currentConversation, conversations, dispatch]);

  const handleSendMessage = async () => {
    if (!message.trim() || !currentConversation) return;

    const userMessage = {
      id: Date.now(),
      content: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    dispatch(addMessage(userMessage));
    setMessage('');
    setIsTyping(true);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: userMessage.content }],
              },
            ],
          }),
        }
      );

      const data = await res.json();
      console.log('Gemini response:', data);

      const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';

      const aiMessage = {
        id: Date.now() + 1,
        content: aiText,
        sender: 'ai',
        timestamp: new Date().toISOString(),
      };

      dispatch(addMessage(aiMessage));
    } catch (err) {
      dispatch(
        addMessage({
          id: Date.now() + 1,
          content: '❌ Gemini API error: Something went wrong.',
          sender: 'ai',
          timestamp: new Date().toISOString(),
        })
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewConversation = () => {
    dispatch(startNewConversation({ title: `Chat ${conversations.length + 1}` }));
  };

  const handleExportChat = () => {
    toast({
      title:
        "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleDeleteConversation = () => {
    toast({
      title:
        "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <>
      <Helmet>
        <title>Conversational AI - SHERPA AI Vulnerability Management</title>
        <meta
          name="description"
          content="Chat with SHERPA's AI assistant for security insights, vulnerability analysis, and remediation guidance."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <Sidebar />

        <div className="ml-64 pt-16">
          <div className="p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h1 className="text-3xl font-bold flex items-center gap-3">
                    <MessageSquare className="h-8 w-8 text-primary" />
                    Conversational AI
                  </h1>
                  <p className="text-muted-foreground">
                    Chat with SHERPA's AI for security insights and guidance
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleExportChat}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button onClick={handleNewConversation}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Chat
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle className="text-lg">Chat History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {conversations.map((conv) => (
                        <div
                          key={conv.id}
                          className={`p-3 rounded-lg cursor-pointer transition-colors ${
                            currentConversation?.id === conv.id
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-accent'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium truncate">{conv.title}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={handleDeleteConversation}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-xs opacity-70 mt-1">
                            {new Date(conv.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-primary" />
                      SHERPA AI Assistant
                    </CardTitle>
                    <CardDescription>
                      Ask me anything about your security vulnerabilities and I'll provide expert guidance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="h-96 overflow-y-auto p-6 space-y-4 scrollbar-hide">
                      {!currentConversation?.messages?.length && (
                        <div className="text-center text-muted-foreground py-8">
                          <Bot className="h-12 w-12 mx-auto mb-4 text-primary" />
                          <p className="text-lg font-medium mb-2">Welcome to SHERPA AI!</p>
                          <p>I'm here to help you with security analysis and vulnerability management.</p>
                          <p className="text-sm mt-2">Try asking me about:</p>
                          <ul className="text-sm mt-2 space-y-1">
                            <li>• Vulnerability prioritization</li>
                            <li>• Remediation strategies</li>
                            <li>• Security best practices</li>
                            <li>• Threat analysis</li>
                          </ul>
                        </div>
                      )}

                      {currentConversation?.messages?.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex gap-3 ${
                            msg.sender === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          {msg.sender === 'ai' && (
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                              <Bot className="h-4 w-4 text-primary-foreground" />
                            </div>
                          )}

                          <div
                            className={`max-w-[70%] p-3 rounded-lg ${
                              msg.sender === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-accent'
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {new Date(msg.timestamp).toLocaleTimeString()}
                            </p>
                          </div>

                          {msg.sender === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                              <User className="h-4 w-4" />
                            </div>
                          )}
                        </motion.div>
                      ))}

                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex gap-3"
                        >
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <Bot className="h-4 w-4 text-primary-foreground" />
                          </div>
                          <div className="bg-accent p-3 rounded-lg">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                              <div
                                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                style={{ animationDelay: '0.1s' }}
                              />
                              <div
                                className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                                style={{ animationDelay: '0.2s' }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>

                    <div className="border-t p-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Ask me about security vulnerabilities..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          disabled={isTyping}
                        />
                        <Button onClick={handleSendMessage} disabled={!message.trim() || isTyping}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConversationalAI;
