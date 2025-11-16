import { CameraView, useCameraPermissions } from 'expo-camera';
import { ScrollView, StyleSheet, View, Button, Text, Pressable, Alert, ActivityIndicator } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { ThemedText } from '@/components/themed-text';
import { Fonts } from '@/constants/theme';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

const GOOGLE_CLOUD_VISION_API_KEY = 'AIzaSyCwoPibiynxqXEQKt7BHCqFUfj2m0PF3_M';

interface ReceiptItem {
  name: string;
  price: number;
  quantity?: number;
}

interface ParsedReceipt {
  items: ReceiptItem[];
  total: number;
  date?: string;
  storeName?: string;
}

export default function TabTwoScreen() {
  const [showCamera, setShowCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [parsedReceipt, setParsedReceipt] = useState<ParsedReceipt | null>(null);
  const cameraRef = useRef<CameraView>(null);

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission]);


  // THIS IS BROKEN!!!
  const parseReceiptText = (text: string): ParsedReceipt => {
  const lines = text
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0);

  const items: ReceiptItem[] = [];
  let storeName = lines[0];
  let date = '';
  let total = 0;

  const dateRegex = /\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}/;
  const priceRegex = /\$?(\d+(\.\d{2})?)/;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!date) {
      const d = line.match(dateRegex);
      if (d) date = d[0];
    }

    const priceMatch = line.trim().match(priceRegex);
    if (priceMatch) {
      const price = parseFloat(priceMatch[1]);
      const itemName = lines[i-1].trim();
      items.push({ name: itemName, price });
    }
  }

  total = items.reduce((sum, item) => sum + item.price, 0);

  return {
    items,
    total,
    date: date || undefined,
    storeName: storeName || undefined
  };
};


  const processImageForOCR = async (imageUri: string) => {
    try {
      setIsProcessing(true);

      const manipResult = await ImageManipulator.manipulateAsync(
        imageUri,
        [],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG, base64: true }
      );

      const base64 = manipResult.base64;
      if (!base64) throw new Error('Failed to convert image to base64');

      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_VISION_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requests: [
              {
                image: { content: base64 },
                features: [{ type: 'DOCUMENT_TEXT_DETECTION' }],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("RESULT:", JSON.stringify(result, null, 2));

      if (!result || !result.responses || !Array.isArray(result.responses)) {
        console.error('Invalid response structure:', result);
        throw new Error('Invalid response from Vision API');
      }

      if (result.responses[0]?.error) {
        console.error('Vision API Error:', result.responses[0].error);
        throw new Error(result.responses[0].error.message || 'Vision API error');
      }

      const text = result.responses[0]?.fullTextAnnotation?.text || '';
      setRecognizedText(text);

      if (text) {
        const parsed = parseReceiptText(text);
        setParsedReceipt(parsed);
        Alert.alert(
          'Success!',
          `Found ${parsed.items.length} items. Total: $${parsed.total.toFixed(2)}`,
          [
            { text: 'View Details', onPress: () => console.log(parsed) },
            { text: 'OK' }
          ]
        );
      } else {
        Alert.alert('No Text Found', 'Could not extract text from the image');
      }

      return text;
    } catch (error) {
      console.error('Error processing image for OCR:', error);
      
      let errorMessage = 'Failed to process image.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      Alert.alert('Error', errorMessage + ' Please check your API key and try again.');
      return null;
    } finally {
      setIsProcessing(false);
    }
  };
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      console.log('Selected image:', imageUri);
      await processImageForOCR(imageUri);
    }
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log("Photo taken:", photo.uri);
        setShowCamera(false);
        await processImageForOCR(photo.uri);
      } catch (error) {
        console.error("Error taking photo:", error);
        Alert.alert("Error", "Failed to take photo");
      }
    }
  };

  return (
    <ScrollView style={styles.scrollBackground} contentContainerStyle={styles.scrollContent}>
      <ThemedText
        type="title"
        style={styles.titleContent}
      >
        Add Your Receipt
      </ThemedText>

      {isProcessing && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#BDE1B4" />
          <Text style={styles.loadingText}>Processing image...</Text>
        </View>
      )}

      <Pressable 
        style={styles.openButton}
        onPress={pickImage}
        disabled={isProcessing}
      >
        <AntDesign size={24} name="upload" color="#ffffff" />
        <Text style={styles.buttonText}>Upload Receipt</Text>
      </Pressable>
      
      <ThemedText
        type="title"
        style={styles.textContent}
      >
        OR
      </ThemedText>

      {!showCamera && (
        <Pressable 
          style={styles.openButton}
          onPress={() => setShowCamera(true)}
          disabled={isProcessing}
        >
          <AntDesign size={24} name="camera" color="#ffffff" />
          <Text style={styles.buttonText}>Take Photo</Text>
        </Pressable>
      )}

      {showCamera && (
        <View style={styles.cameraContainer}>
          {!permission ? (
            <Text>Loading camera permissions...</Text>
          ) : !permission.granted ? (
            <View style={styles.permissionContainer}>
              <Text>Camera permission required</Text>
              <Button title="Grant Permission" onPress={requestPermission} />
            </View>
          ) : (
            <>
              <CameraView 
                ref={cameraRef}
                style={styles.camera}
                facing="back"
              />
              <View style={styles.cameraControls}>
                <Pressable 
                  style={styles.captureButton}
                  onPress={takePhoto}
                >
                  <AntDesign size={32} name="camera" color="#ffffff" />
                </Pressable>
              </View>
            </>
          )}
          <Pressable 
            style={styles.openButton}
            onPress={() => setShowCamera(false)}
          >
            <Text style={styles.buttonText}>Close Camera</Text>
          </Pressable>
        </View>
      )}

      {parsedReceipt && (
        <View style={styles.resultContainer}>
          <ThemedText style={styles.resultTitle}>Receipt Details</ThemedText>
          
          {parsedReceipt.storeName && (
            <Text style={styles.storeName}>{parsedReceipt.storeName}</Text>
          )}
          
          {parsedReceipt.date && (
            <Text style={styles.dateText}>Date: {parsedReceipt.date}</Text>
          )}

          <View style={styles.itemsContainer}>
            <Text style={styles.sectionTitle}>Items ({parsedReceipt.items.length}):</Text>
            {parsedReceipt.items.map((item, index) => (
              <View key={index} style={styles.itemRow}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
              </View>
            ))}
          </View>

          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>${parsedReceipt.total.toFixed(2)}</Text>
          </View>

          {recognizedText && (
            <Pressable 
              style={styles.viewRawButton}
              onPress={() => Alert.alert('Raw Text', recognizedText)}
            >
              <Text style={styles.viewRawText}>View Raw Text</Text>
            </Pressable>
          )}
        </View>
      )}
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollBackground: { 
    flex: 1, 
    backgroundColor: '#D1E9F0' 
  },
  scrollContent: { 
    paddingTop: 80, 
    paddingHorizontal: 20, 
    paddingBottom: 20,
  },
  titleContent: {
    textAlign: 'center',
    fontFamily: Fonts.rounded, 
    color: '#000000', 
    fontSize: 32,
  },
  textContent: {
    textAlign: 'center',
    fontFamily: Fonts.rounded, 
    color: '#000000', 
    fontSize: 25,
  },
  openButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BDE1B4',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    gap: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: Fonts.rounded,
    fontWeight: '600',
  },
  cameraContainer: {
    height: 500,
    borderRadius: 12,
    overflow: 'hidden',
    marginVertical: 20,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#BDE1B4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20,
    gap: 10,
  },
  loadingText: {
    fontFamily: Fonts.rounded,
    fontSize: 16,
    color: '#000000',
  },
  resultContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    fontFamily: Fonts.rounded,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15,
    color: '#000000',
  },
  storeName: {
    fontFamily: Fonts.rounded,
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 5,
  },
  dateText: {
    fontFamily: Fonts.rounded,
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
  },
  itemsContainer: {
    marginTop: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: Fonts.rounded,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#000000',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemName: {
    fontFamily: Fonts.rounded,
    fontSize: 14,
    color: '#333333',
    flex: 1,
  },
  itemPrice: {
    fontFamily: Fonts.rounded,
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    borderTopWidth: 2,
    borderTopColor: '#BDE1B4',
    marginTop: 10,
  },
  totalLabel: {
    fontFamily: Fonts.rounded,
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  totalAmount: {
    fontFamily: Fonts.rounded,
    fontSize: 18,
    fontWeight: '700',
    color: '#BDE1B4',
  },
  viewRawButton: {
    marginTop: 15,
    padding: 10,
    alignItems: 'center',
  },
  viewRawText: {
    fontFamily: Fonts.rounded,
    fontSize: 14,
    color: '#666666',
    textDecorationLine: 'underline',
  },
});