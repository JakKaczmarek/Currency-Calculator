import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { styles } from "./styles";
import { HistoryProvider, useHistory } from "./HistoryContext";
import { Image } from "react-native";

interface CurrencyData {
  rates: Record<string, number>;
}

const App: React.FC = () => {
  const [amount, setAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("PLN");
  const [result, setResult] = useState<string | null>(null);
  const [currencyList, setCurrencyList] = useState<
    { label: string; value: string }[]
  >([]);

  const { transactions, addToHistory, clearHistory } = useHistory();

  useEffect(() => {
    const fetchCurrencyList = async () => {
      try {
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        const data: CurrencyData = await response.json();

        const currencies = Object.keys(data.rates).map((currency) => ({
          label: currency,
          value: currency,
        }));

        setCurrencyList(currencies);
      } catch (error) {
        console.error("Błąd podczas pobierania listy walut:", error);
      }
    };

    fetchCurrencyList();
  }, []);

  const convertCurrency = async () => {
    try {
      if (!amount || isNaN(Number(amount.replace(",", ".")))) {
        setResult("Wprowadź poprawną kwotę.");
        return;
      }
      const response = await fetch(
        `https://open.er-api.com/v6/latest/${fromCurrency}`
      );
      const data: CurrencyData = await response.json();

      const exchangeRate = data.rates[toCurrency];
      if (exchangeRate === undefined) {
        throw new Error(`No data for the exchange rate of ${toCurrency}`);
      }

      const amountValue = Number(amount.replace(",", "."));
      const convertedResult = (amountValue * exchangeRate).toFixed(2);
      const newTransaction = `${amount} ${fromCurrency} to ${convertedResult} ${toCurrency}`;

      if (!transactions.includes(newTransaction)) {
        addToHistory(newTransaction);
        setResult(newTransaction);
      } else {
        setResult("Ta transakcja już istnieje w historii.");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Unknown error:", error.message);
        setResult("Wystąpił błąd. Spróbuj ponownie później.");
      } else {
        console.error("Unknown error:", error);
        setResult("Wystąpił nieznany błąd. Spróbuj ponownie później.");
      }
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
    >
      <KeyboardAvoidingView style={styles.container}>
        <Image source={require("./assets/icon.png")} style={styles.logo} />
        <Text style={styles.heading}>Kalkulator Walut</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Kwota:</Text>
          <TextInput
            style={styles.input}
            placeholder="Wprowadź kwotę"
            keyboardType="numeric"
            value={amount}
            placeholderTextColor="#999999"
            onChangeText={(text) => setAmount(text)}
          />

          <View style={styles.currencyContainer}>
            <View style={styles.currencySelect}>
              <Text style={styles.label}>Z waluty:</Text>
              <RNPickerSelect
                onValueChange={(value) => setFromCurrency(value)}
                items={currencyList}
                value={fromCurrency}
                style={{
                  inputAndroid: styles.select,
                  inputIOS: styles.select,
                }}
              />
            </View>

            <View style={styles.currencySelect}>
              <Text style={styles.label}>Na walutę:</Text>
              <RNPickerSelect
                onValueChange={(value) => setToCurrency(value)}
                items={currencyList}
                value={toCurrency}
                style={{
                  inputAndroid: styles.select,
                  inputIOS: styles.select,
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Przelicz" onPress={convertCurrency} color="#000000" />
        </View>

        <Text style={styles.resultHeading}>Wynik:</Text>
        {result && transactions.length > 0 && (
          <Text style={styles.result}>{result}</Text>
        )}

        <View style={styles.historyContainer}>
          {transactions.length > 0 && (
            <>
              <View style={styles.clearButtonContainer}>
                <Button
                  title="Wyczyść historię"
                  onPress={clearHistory}
                  color="#000000"
                />
              </View>
              <Text style={styles.resultHeading}>Historia:</Text>
              {transactions.map((transaction, index) => (
                <Text key={index} style={styles.historyItem}>
                  {transaction}
                </Text>
              ))}
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const AppWithHistoryProvider: React.FC = () => (
  <HistoryProvider>
    <App />
  </HistoryProvider>
);

export default AppWithHistoryProvider;
