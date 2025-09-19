import React, { useState } from 'react';
import { Text, Button, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const questions = [
  {
    question: 'During a flash flood, you should?',
    options: [
      'Stay in your vehicle',
      'Go outside',
      'Move to higher ground',
      'Swim through water'
    ],
    correctIndex: 2,
    points: 10,
  },
  {
    question: 'Which of the following is a sign of an incoming flood?',
    options: [
      'Cloudless sky',
      'Sudden heavy rainfall',
      'Cool breeze',
      'Dry riverbeds'
    ],
    correctIndex: 1,
    points: 10,
  },
  {
    question: 'What should you do if floodwaters are rising around your car?',
    options: [
      'Drive faster',
      'Abandon the car and move to higher ground',
      'Honk your horn continuously',
      'Roll down your windows'
    ],
    correctIndex: 1,
    points: 10,
  },
  {
    question: 'How deep can just 6 inches of moving water be to knock you down?',
    options: [
      '1 inch',
      '3 inches',
      '6 inches',
      '12 inches'
    ],
    correctIndex: 2,
    points: 10,
  },
  {
    question: 'What is the safest action when you see a flooded road?',
    options: [
      'Drive through quickly',
      'Test the water depth with a stick',
      'Turn around and find another route',
      'Follow other cars into the water'
    ],
    correctIndex: 2,
    points: 10,
  },
  {
    question: 'After a flood, what should you avoid doing?',
    options: [
      'Check for structural damage',
      'Drink tap water before confirming it’s safe',
      'Report hazards to authorities',
      'Disinfect your belongings'
    ],
    correctIndex: 1,
    points: 10,
  },
  {
    question: 'Why should you avoid walking or driving through floodwaters?',
    options: [
      'You might get wet',
      'It could damage your shoes',
      'Floodwaters may hide dangerous debris or currents',
      'It’s inconvenient'
    ],
    correctIndex: 2,
    points: 10,
  },
  {
    question: 'What emergency items should you have ready during flood season?',
    options: [
      'Flashlight, batteries, water, and first aid kit',
      'Beach ball, snacks, and fan',
      'Television and game console',
      'Binoculars and insect spray'
    ],
    correctIndex: 0,
    points: 10,
  },
  {
    question: 'Which of these is the most important reason to evacuate early during a flood warning?',
    options: [
      'To avoid traffic',
      'To avoid panic attacks',
      'To keep yourself and family safe',
      'To take photos of the flood'
    ],
    correctIndex: 2,
    points: 10,
  },
  {
    question: 'What does a flood watch mean?',
    options: [
      'Flooding is happening now',
      'Conditions are right for flooding',
      'The flood is over',
      'There is a dam nearby'
    ],
    correctIndex: 0,
    points: 10,
  }
];

export default function QuizCard({ user, setUser }) {
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleAnswer = async (i) => {
    setSelected(i);
    setAnswered(true);

    try {
      const stored = await AsyncStorage.getItem('user');
      if (!stored) return;

      const data = JSON.parse(stored);
      if (i === questions.correctIndex) {
        data.points += questions.points;
        await AsyncStorage.setItem('user', JSON.stringify(data));
        setUser(data);
      }
    } catch (e) {
      console.error('Error updating points:', e);
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Title title="Daily Quiz" />
      <Card.Content>
        <Text style={styles.q}>{questions.question}</Text>
        {questions.options.map((opt, idx) => (
          <Button
            key={idx}
            title={opt}
            color={
              answered
                ? idx === questions.correctIndex
                  ? 'green'
                  : idx === selected
                  ? 'red'
                  : 'gray'
                : 'blue'
            }
            onPress={() => handleAnswer(idx)}
            disabled={answered}
          />
        ))}
        {answered && (
          <Text style={styles.result}>
            {selected === questions.correctIndex
              ? `✅ Good! +${question.points} pts`
              : '❌ Wrong — try again tomorrow'}
          </Text>
        )}
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginTop: 20 },
  q: { fontSize: 16, marginBottom: 10 },
  result: { marginTop: 10, fontWeight: 'bold' },
});