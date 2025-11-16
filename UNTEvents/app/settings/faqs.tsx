import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem = ({ question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.faqItem}>
      <TouchableOpacity 
        style={styles.questionContainer}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={styles.questionText}>{question}</Text>
        <Ionicons 
          name={isOpen ? 'chevron-up' : 'chevron-down'} 
          size={24} 
          color="#00853E" 
        />
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.answerContainer}>
          <Text style={styles.answerText}>{answer}</Text>
        </View>
      )}
    </View>
  );
};

export default function FAQsScreen() {
  const faqs = [
    {
      question: "How do I RSVP to an event?",
      answer: "Tap the heart icon on any event card to save it to your 'My Planned Events'. This lets you keep track of events you're interested in attending."
    },
    {
      question: "How do I find events by category?",
      answer: "From the Current Events screen, tap 'Browse by Categories' to view events organized by Academic & Professional, Sports, Arts & Entertainment, Clubs, and Other Events."
    },
    {
      question: "Can I get notifications for events?",
      answer: "Yes! Go to Settings and toggle Notifications On. You'll receive reminders before events you've saved start."
    },
    {
      question: "How do I view the calendar?",
      answer: "Tap the Calendar tab at the bottom of the screen to see all upcoming events in a monthly calendar view."
    },
    {
      question: "Who can use the UNT Events app?",
      answer: "The app is available to all UNT students, faculty, and staff. You'll need to sign in with your @my.unt.edu email address."
    },
    {
      question: "How do I edit my profile?",
      answer: "Go to Settings > Account > Edit Profile to update your name, email preferences, and notification settings."
    },
    {
      question: "What if an event gets cancelled?",
      answer: "If an event you've saved is cancelled or rescheduled, you'll receive a notification with the updated information."
    },
    {
      question: "Can I suggest events to be added?",
      answer: "Yes! Contact us through Settings > Support > Contact Us to suggest events or organizations you'd like to see featured."
    },
    {
      question: "How do I turn off notifications?",
      answer: "Go to Settings > Notifications and toggle the switch to Off. You can turn them back on anytime."
    },
    {
      question: "Is my data private?",
      answer: "Yes, we take your privacy seriously. View our complete Privacy Policy in Settings > Privacy & Permissions to learn how we protect your data."
    }
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'FAQs',
          headerStyle: {
            backgroundColor: '#00853E',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
          <Text style={styles.headerSubtitle}>
            Tap any question to see the answer
          </Text>
        </View>

        {faqs.map((faq, index) => (
          <FAQItem 
            key={index} 
            question={faq.question} 
            answer={faq.answer} 
          />
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Still have questions?
          </Text>
          <Text style={styles.footerSubtext}>
            Contact us through Settings → Support → Contact Us
          </Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00853E',
  },
  header: {
    backgroundColor: '#00853E',
    padding: 20,
    paddingBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#a8d5a8',
  },
  faqItem: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#000',
    overflow: 'hidden',
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginRight: 12,
  },
  answerContainer: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  answerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  footer: {
    alignItems: 'center',
    padding: 32,
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00853E',
    marginBottom: 8,
  },
  footerSubtext: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
});