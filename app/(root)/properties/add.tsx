import FormField from "@/components/FormField";
import MapPicker from "@/components/MapPicker";
import SelectField from "@/components/SelectField";
import * as ImagePicker from "expo-image-picker";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Section } from "@/components/Section";
import {
  AreaUnit,
  Property,
  PropertyStatus,
  PropertyType,
} from "@/constants/property";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";

import { auth, db } from "@/firebase/config";
import { createProperty } from "@/src/services/property.service";
import { doc, getDoc } from "firebase/firestore";

// ================= SCREEN =================
export default function AddPropertyScreen() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<Property>({
    title: "",
    type: "House",
    status: "Draft",
    price: 0,
    bedrooms: 1,
    bathrooms: 1,
    area: 0,
    areaUnit: "m2",
    description: "",
    coverImage: "",
    gallery: [],
    location: {
      city: "",
      address: "",
      latitude: 0,
      longitude: 0,
    },
  });

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    if (
      !form.title ||
      !form.location.city ||
      !form.location.address ||
      !form.coverImage
    ) {
      Alert.alert(
        "Validation",
        "Title, City, Address, dan Cover Image wajib diisi"
      );
      return;
    }

    if (!auth.currentUser) {
      Alert.alert("Error", "User not authenticated");
      return;
    }

    try {
      setLoading(true);

      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.exists() ? userSnap.data() : null;

      await createProperty({
        title: form.title,
        type: form.type,
        listingStatus: form.status,
        price: form.price,

        bedrooms: form.bedrooms,
        bathrooms: form.bathrooms,
        area: form.area,
        areaUnit: form.areaUnit,

        description: form.description,

        city: form.location.city,
        fullAddress: form.location.address,
        latitude: form.location.latitude,
        longitude: form.location.longitude,

        coverImageUri: form.coverImage,
        galleryImageUris: form.gallery,

        ownerId: auth.currentUser.uid,
        ownerName: userData?.name || "Unknown",
        ownerPhone: userData?.phone || "-",
      });

      Alert.alert("Success", "Property successfully created");
      router.back();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to create property");
    } finally {
      setLoading(false);
    }
  };

  // ================= PERMISSIONS =================
  const requestCameraPermission = async () => {
    const { status } =
      await ImagePicker.requestCameraPermissionsAsync();
    return status === "granted";
  };

  const requestGalleryPermission = async () => {
    const { status } =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === "granted";
  };

  // ================= COVER IMAGE =================
  const handlePickCoverImage = () => {
    Alert.alert("Cover Image", "Pilih sumber gambar", [
      { text: "Kamera", onPress: openCoverCamera },
      { text: "Galeri", onPress: openCoverGallery },
      { text: "Batal", style: "cancel" },
    ]);
  };

  const openCoverCamera = async () => {
    const allowed = await requestCameraPermission();
    if (!allowed) {
      Alert.alert("Permission", "Akses kamera ditolak");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setForm({ ...form, coverImage: result.assets[0].uri });
    }
  };

  const openCoverGallery = async () => {
    const allowed = await requestGalleryPermission();
    if (!allowed) {
      Alert.alert("Permission", "Akses galeri ditolak");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setForm({ ...form, coverImage: result.assets[0].uri });
    }
  };

  // ================= GALLERY =================
  const handlePickGalleryImage = () => {
    Alert.alert("Gallery", "Pilih sumber gambar", [
      { text: "Kamera", onPress: openGalleryCamera },
      { text: "Galeri", onPress: openGalleryLibrary },
      { text: "Batal", style: "cancel" },
    ]);
  };

  const openGalleryCamera = async () => {
    if (form.gallery.length >= 5) {
      Alert.alert("Limit", "Maksimal 5 gambar");
      return;
    }

    const allowed = await requestCameraPermission();
    if (!allowed) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setForm({
        ...form,
        gallery: [...form.gallery, result.assets[0].uri],
      });
    }
  };

  const openGalleryLibrary = async () => {
    const allowed = await requestGalleryPermission();
    if (!allowed) return;

    const remaining = 5 - form.gallery.length;
    if (remaining <= 0) {
      Alert.alert("Limit", "Maksimal 5 gambar");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      selectionLimit: remaining,
      quality: 0.7,
    });

    if (!result.canceled) {
      const uris = result.assets.map((a) => a.uri);
      setForm({ ...form, gallery: [...form.gallery, ...uris] });
    }
  };

  // ================= UI =================
  return (
    <View style={styles.wrapper}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Property</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Section title="Basic Information">
          <FormField
            label="Property Title"
            value={form.title}
            onChangeText={(v) => setForm({ ...form, title: v })}
          />

          <SelectField
            label="Property Type"
            value={form.type}
            onValueChange={(v) =>
              setForm({ ...form, type: v as PropertyType })
            }
            items={[
              { label: "House", value: "House" },
              { label: "Apartment", value: "Apartment" },
              { label: "Villa", value: "Villa" },
              { label: "Land", value: "Land" },
              { label: "Ruko", value: "Ruko" },
            ]}
          />

          <SelectField
            label="Property Status"
            value={form.status}
            onValueChange={(v) =>
              setForm({ ...form, status: v as PropertyStatus })
            }
            items={[
              { label: "Draft", value: "draft" },
              { label: "Available", value: "available" },
              { label: "Reserved", value: "reserved" },
              { label: "Sold", value: "sold" },
            ]}
          />
        </Section>

        <Section title="Description">
          <FormField
            label="Property Description"
            value={form.description}
            multiline
            onChangeText={(v) => setForm({ ...form, description: v })}
          />
        </Section>

        <Section title="Price">
          <FormField
            label="Price"
            value={String(form.price)}
            keyboardType="numeric"
            onChangeText={(v) =>
              setForm({ ...form, price: Number(v) })
            }
          />
        </Section>

        <Section title="Specification">
          <FormField
            label="Bedrooms"
            value={String(form.bedrooms)}
            keyboardType="numeric"
            onChangeText={(v) =>
              setForm({ ...form, bedrooms: Number(v) })
            }
          />

          <FormField
            label="Bathrooms"
            value={String(form.bathrooms)}
            keyboardType="numeric"
            onChangeText={(v) =>
              setForm({ ...form, bathrooms: Number(v) })
            }
          />

          <FormField
            label="Area"
            value={String(form.area)}
            keyboardType="numeric"
            onChangeText={(v) =>
              setForm({ ...form, area: Number(v) })
            }
          />

          <SelectField
            label="Area Unit"
            value={form.areaUnit}
            onValueChange={(v) =>
              setForm({ ...form, areaUnit: v as AreaUnit })
            }
            items={[
              { label: "m²", value: "m2" },
              { label: "sqft", value: "sqft" },
            ]}
          />
        </Section>

        <Section title="Location">
          <FormField
            label="City"
            value={form.location.city}
            onChangeText={(v) =>
              setForm({
                ...form,
                location: { ...form.location, city: v },
              })
            }
          />

          <FormField
            label="Full Address"
            value={form.location.address}
            onChangeText={(v) =>
              setForm({
                ...form,
                location: { ...form.location, address: v },
              })
            }
          />

          <Text style={{ marginBottom: 8, fontWeight: "600" }}>
            Pick Location on Map
          </Text>

          <MapPicker
            latitude={form.location.latitude}
            longitude={form.location.longitude}
            onSelectLocation={(lat, lng) =>
              setForm({
                ...form,
                location: {
                  ...form.location,
                  latitude: lat,
                  longitude: lng,
                },
              })
            }
          />
        </Section>

        <Section title="Media">
          <TouchableOpacity
            style={styles.mediaBtn}
            onPress={handlePickCoverImage}
          >
            <Text style={styles.mediaText}>
              {form.coverImage
                ? "Change Cover Image"
                : "Upload Cover Image"}
            </Text>
          </TouchableOpacity>

          {form.coverImage && (
            <Image
              source={{ uri: form.coverImage }}
              style={{
                height: 180,
                borderRadius: 12,
                marginTop: 12,
              }}
            />
          )}
        </Section>

        <Section title="Gallery">
          <TouchableOpacity
            style={styles.mediaBtn}
            onPress={handlePickGalleryImage}
          >
            <Text style={styles.mediaText}>
              Upload Gallery ({form.gallery.length}/5)
            </Text>
          </TouchableOpacity>
        </Section>

        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitText}>
            {loading ? "Saving..." : "Save Property"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

// ================= STYLES =================
const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "#F8FAFC" },
  header: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  container: { padding: 16, paddingBottom: 40 },
  mediaBtn: {
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  mediaText: { fontWeight: "600" },
  submitBtn: {
    marginTop: 16,
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 12,
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },
});
