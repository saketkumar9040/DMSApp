import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, Modal, Platform, FlatList, ScrollView, ActivityIndicatorBase, Alert, Dimensions } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import styles from './style'
import { Colors } from '../../globals/Colors'
import { FontSizes } from '../../globals/FontSizes'
import DropDownPicker from 'react-native-dropdown-picker';
import APIServices from '../../services/APIServices';
import { set_logout, set_tags } from '../../redux/slices/mainSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pick, types } from '@react-native-documents/picker';

const HomeScreen = ({ navigation, route }: any) => {

  const dispatch = useDispatch()

  const store_user_data = useSelector((state: any) => state.main);
  console.log("store_user_data", store_user_data);

  const [open_upload_modal, set_open_upload_modal] = useState(false)
  const [open_search_modal, set_open_search_modal] = useState(false)
  const [open_search_result_modal, set_open_search_result_modal] = useState(false)
  const [upload_document_pressed, set_upload_document_pressed] = useState(false);
  const [search_document_pressed, set_search_document_pressed] = useState(false);
  const [document_search_result, set_document_search_result] = useState([]);

  const [date, set_date] = useState("");
  const [from_date, set_from_date] = useState("");
  const [to_date, set_to_date] = useState("");
  const [open_upload_date_picker, set_open_upload_date_picker] = useState(false);
  const [open_upload_from_date_picker, set_open_upload_from_date_picker] = useState(false);
  const [open_upload_to_date_picker, set_open_upload_to_date_picker] = useState(false);
  const [selected_tag, set_selected_tag] = useState<any>(null)
  const [selected_category, set_selected_category] = useState(null)
  const [selected_sub_category, set_selected_sub_category] = useState(null);
  const [open_category_dropdown, set_open_category_dropdown] = useState(false);
  const [open_sub_category_dropdown, set_open_sub_category_dropdown] = useState(false);

  const [is_open, set_is_open] = useState(false)
  const [remarks, set_remarks] = useState("");

  const [image, set_image] = useState<any>(null)

  const [category_list, set_category_list] = useState([
    { label: "Personal", value: "personal" },
    { label: "Professional", value: "professional" },
  ]);

  const [personal_category_list, set_personal_category_list] = useState([
    { label: "Jhon", value: "Jhon" },
    { label: "Tom", value: "Tom" },

    { label: "Emily", value: "Emily" },
  ]);

  const [professional_category_list, set_professional_category_list] = useState([
    { label: "Account", value: "Account" },
    { label: "HR", value: "HR" },
    { label: "IT", value: "IT" },
    { label: "Finance", value: "Finance" },
  ]);

  useEffect(() => {
    fetch_document_tags()
  }, []);

  const suggestions = useMemo(() => {
    if (!is_open) return;
    if (!selected_tag) return [];
    const q = selected_tag.trim().toLowerCase();
    const starts = store_user_data.tags.filter((i: any) => i.label.toLowerCase().startsWith(q));
    const includes = store_user_data.tags.filter(
      (i: any) => !starts.includes(i) && i.label.toLowerCase().includes(q)
    );
    console.log(starts, includes)
    return [...starts, ...includes].slice(0, 10)
  }, [selected_tag, store_user_data, is_open]);

  const upload_documemnt_handler = async () => {
    try {
      set_upload_document_pressed(true);

      const res: any = await APIServices.upload_file(image, selected_category, selected_sub_category, date, remarks, selected_tag, store_user_data.user_id)
      console.log("upload file response =========> ", res);
      if (res.status == true) {
        set_open_upload_modal(false);
        set_date("");
        set_image(null);
        set_selected_category(null);
        set_selected_sub_category(null);
        set_selected_tag(null);
        set_remarks("")
        return Alert.alert(res.message)
      } else if (res.status == false) {
        return Alert.alert(res.message)
      }
    } catch (error) {
      console.log("Error while uploading document =========> ", error)
    } finally {
      set_upload_document_pressed(false)
    }
  };

  const search_documemnt_handler = async () => {
    try {
      set_search_document_pressed(true)
      const res: any = await APIServices.search_document(selected_category, "", from_date, to_date, [{ tag_name: selected_tag }], "", "", { value: "" });
      console.log("search document response ========> ", res);
      if (res.status == true) {
        if (res.data.length == 0) {
          return Alert.alert("Sorry", "No Data found. Please try with some other filters")
        }
        set_document_search_result(res.data);
        set_open_search_result_modal(true)
        set_from_date("");
        set_to_date("");
        set_selected_category(null);
        set_selected_tag(null);
        return
      }
    } catch (error) {
      console.log("Error while uploading document =========> ", error)
    } finally {
      set_search_document_pressed(false)
    }
  };


  const fetch_document_tags = async () => {
    try {
      const res: any = await APIServices.document_tags("");
      console.log("fetch doument tags response ==========> ", res);
      if (res.status == true) {
        dispatch(set_tags(res.data))
      }
    } catch (error) {
      console.log("Error while fetching document tags ===========> ", error)
    }
  };

  const logout_handler = async () => {
    try {
      await AsyncStorage.clear()
      dispatch(set_logout(""))
    } catch (error) {
      console.log(error)
    }
  };

  const pick_image_handler = async () => {
    try {
      const res = await pick({
        type: [types.pdf, types.images],
      });
      console.log(res)
      const f: any = res[0];
      set_image(f)

      return
    } catch (error) {
      console.log("Error while selecting image ========> ",)
    }
  };

  const take_picture_handler = async () => {
    try {
      const options: any = {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 2000,
        maxWidth: 2000,
      };

      launchCamera(options, (response: any) => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.error) {
          console.log('Camera Error: ', response.error);
        } else {
          console.log(response)
          let imageUri = response.uri || response.assets?.[0]?.uri;
          set_image(response.assets?.[0]);
          console.log(imageUri);
        }
      });

      return
    } catch (error) {
      console.log("Error while selecting image ========> ",)
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* ===========================   Search modal     =========================== */}
      {
        open_search_modal && (
          <Modal
            animationType="slide"
            transparent
            visible={open_search_modal}
            onRequestClose={() => set_open_search_modal(false)}
          >
            <View
              style={styles.overlay}
            >
              <ScrollView style={{ ...styles.modalContainer, flex: 1, backgroundColor: Colors.bg, padding: 15 }} nestedScrollEnabled>
                <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => set_open_search_modal(false)}>
                  <Text style={styles.closeText}>close</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, paddingVertical: 30, paddingHorizontal: 20 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                    <Text style={styles.titleHeading}>From Date</Text>
                    <TouchableOpacity style={styles.titleTextInput} onPress={() => set_open_upload_from_date_picker(true)}>
                      <Text style={styles.titleHeading}>{from_date || "Enter Date"}</Text>
                    </TouchableOpacity>

                    {open_upload_from_date_picker && (
                      <DateTimePicker
                        value={from_date ? new Date(from_date) : new Date()}
                        mode={"date"}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(event: any, selectedDate?: any) => {
                          if (event.type === "dismissed" || !selectedDate) {
                            set_open_upload_from_date_picker(false);
                            return;
                          }
                          console.log("Selected date", JSON.stringify(selectedDate))
                          set_from_date(new Intl.DateTimeFormat("en-GB").format(new Date(selectedDate)).replace(/\//g, "-"))
                          set_open_upload_from_date_picker(false)
                        }}
                      />
                    )}
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', marginVertical: 20 }}>
                    <Text style={styles.titleHeading}>To Date</Text>
                    <TouchableOpacity style={styles.titleTextInput} onPress={() => set_open_upload_to_date_picker(true)}>
                      <Text style={styles.titleHeading}>{to_date || "Enter Date"}</Text>
                    </TouchableOpacity>

                    {open_upload_to_date_picker && (
                      <DateTimePicker
                        value={to_date ? new Date(to_date) : new Date()}
                        mode={"date"}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(event: any, selectedDate?: any) => {
                          if (event.type === "dismissed" || !selectedDate) {
                            set_open_upload_to_date_picker(false);
                            return;
                          }
                          console.log("Selected date", JSON.stringify(selectedDate))
                          set_to_date(new Intl.DateTimeFormat("en-GB").format(new Date(selectedDate)).replace(/\//g, "-"))
                          set_open_upload_to_date_picker(false)
                        }}
                      />
                    )}
                  </View>

                  <View style={{ marginVertical: 20, gap: 10 }}>
                    <Text style={styles.titleHeading}>Select a category</Text>
                    <DropDownPicker
                      open={open_category_dropdown}
                      value={selected_category}
                      items={category_list}
                      setOpen={set_open_category_dropdown}
                      setValue={set_selected_category}
                      setItems={set_category_list}
                      placeholder="Select category"
                      style={styles.dropdown}
                      dropDownContainerStyle={styles.dropdownContainer}
                    />
                  </View>

                  <View style={{ marginBottom: 20, gap: 10 }}>
                    <Text style={styles.titleHeading}>Select a Tag</Text>
                    <TextInput
                      placeholder='Enter tag'
                      placeholderTextColor={Colors.grey}
                      style={styles.tagTextInput}
                      value={selected_tag}
                      onChangeText={(e) => {
                        set_selected_tag(e);
                        set_is_open(true)
                      }}
                    />
                    {
                      is_open && (
                        <FlatList
                          keyboardShouldPersistTaps="handled"
                          data={suggestions}
                          keyExtractor={(item) => item.id}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              style={styles.item}
                              onPress={() => {
                                set_selected_tag(item.label);
                                set_is_open(false)
                              }}
                            >
                              <Text style={styles.itemText}>{item.label}</Text>
                            </TouchableOpacity>
                          )}
                          ItemSeparatorComponent={() => <View style={styles.separator} />}
                        />
                      )
                    }
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.generateOTPButton}
                  activeOpacity={0.7}
                  disabled={upload_document_pressed}
                  onPress={() => {
                    search_documemnt_handler()
                  }}
                >
                  {
                    search_document_pressed ? (
                      <ActivityIndicator size={16} color={Colors.bg} style={{ alignSelf: "center" }} />
                    ) : (

                      <Text style={styles.generateOTPText}>
                        Search
                      </Text>
                    )
                  }

                </TouchableOpacity>
              </ScrollView>
            </View>
          </Modal>
        )
      }

      {/* ===========================   Upload modal     =========================== */}
      {
        open_upload_modal && (
          <Modal
            animationType="slide"
            transparent
            visible={open_upload_modal}
            onRequestClose={() => set_open_upload_modal(false)}
          >
            <View
              style={styles.overlay}
            >
              <ScrollView style={{ ...styles.modalContainer, flex: 1, backgroundColor: Colors.bg, padding: 15 }} nestedScrollEnabled>
                <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => set_open_upload_modal(false)}>
                  <Text style={styles.closeText}>close</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, paddingVertical: 30, paddingHorizontal: 20 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                    <Text style={styles.titleHeading}>Pick A Date</Text>
                    <TouchableOpacity style={styles.titleTextInput} onPress={() => set_open_upload_date_picker(true)}>
                      <Text style={styles.titleHeading}>{date || "Enter Date"}</Text>
                    </TouchableOpacity>

                    {open_upload_date_picker && (
                      <DateTimePicker
                        value={date ? new Date(date) : new Date()}
                        mode={"date"}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={(event: any, selectedDate?: any) => {
                          if (event.type === "dismissed" || !selectedDate) {
                            set_open_upload_date_picker(false);
                            return;
                          }
                          console.log("Selected date", JSON.stringify(selectedDate))
                          set_date(new Intl.DateTimeFormat("en-GB").format(new Date(selectedDate)).replace(/\//g, "-"))
                          set_open_upload_date_picker(false)
                        }}
                      />
                    )}
                  </View>
                  {image && (
                    <>
                      <Image
                        source={{ uri: image.uri }}
                        style={{ width: Dimensions.get("window").width - 20, height: 200, alignSelf: "center", marginVertical: 20 }}
                        resizeMode='contain'
                      />
                      <Text style={styles.titleHeading}>{image?.name ? image?.name : image?.fileName}</Text>
                    </>
                  )}
                  <View style={{ alignItems: "center", justifyContent: 'space-between', marginVertical: 15 }}>
                    <Text style={styles.titleHeading}>Pick A image</Text>

                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between', marginVertical: 15, gap: 15 }}>

                      <TouchableOpacity style={styles.titleTextInput} onPress={() => pick_image_handler()}>
                        <Text style={styles.titleHeading}>{"Gallery"}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.titleTextInput} onPress={() => take_picture_handler()}>
                        <Text style={styles.titleHeading}>{"Camera"}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={{ marginVertical: 20, gap: 10 }}>
                    <Text style={styles.titleHeading}>Select a category</Text>
                    <DropDownPicker
                      open={open_category_dropdown}
                      value={selected_category}
                      items={category_list}
                      setOpen={set_open_category_dropdown}
                      setValue={set_selected_category}
                      setItems={set_category_list}
                      placeholder="Select category"
                      style={styles.dropdown}
                      dropDownContainerStyle={styles.dropdownContainer}
                    />
                  </View>

                  <View style={{ marginBottom: 20, gap: 10 }}>
                    <Text style={styles.titleHeading}>Select a sub category</Text>
                    <DropDownPicker
                      open={open_sub_category_dropdown}
                      value={selected_sub_category}
                      items={selected_category == "personal" ? personal_category_list : professional_category_list}
                      disabled={!selected_category}
                      setOpen={set_open_sub_category_dropdown}
                      setValue={set_selected_sub_category}
                      setItems={selected_category == "personal" ? set_personal_category_list : set_professional_category_list}
                      placeholder="Select sub category"
                      style={styles.dropdown}
                      dropDownContainerStyle={styles.dropdownContainer}
                    />
                  </View>

                  <View style={{ marginBottom: 20, gap: 10 }}>
                    <Text style={styles.titleHeading}>Select a Tag</Text>
                    <TextInput
                      placeholder='Enter tag'
                      placeholderTextColor={Colors.grey}
                      style={styles.tagTextInput}
                      value={selected_tag}
                      onChangeText={(e) => {
                        set_selected_tag(e);
                        set_is_open(true)
                      }}
                    />
                    {
                      is_open && (
                        <FlatList
                          keyboardShouldPersistTaps="handled"
                          data={suggestions}
                          keyExtractor={(item) => item.id}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              style={styles.item}
                              onPress={() => {
                                set_selected_tag(item.label);
                                set_is_open(false)
                              }}
                            >
                              <Text style={styles.itemText}>{item.label}</Text>
                            </TouchableOpacity>
                          )}
                          ItemSeparatorComponent={() => <View style={styles.separator} />}
                        />
                      )
                    }
                  </View>
                  <View style={{ marginBottom: 20, gap: 10 }}>
                    <Text style={styles.titleHeading}>Remarks</Text>
                    <TextInput
                      placeholder='Enter remarks'
                      placeholderTextColor={Colors.grey}
                      style={styles.tagTextInput}
                      value={remarks}
                      onChangeText={(e) => {
                        set_remarks(e);

                      }}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.generateOTPButton}
                  activeOpacity={0.7}
                  disabled={upload_document_pressed}
                  onPress={() => {
                    upload_documemnt_handler()
                  }}
                >
                  {
                    upload_document_pressed ? (
                      <ActivityIndicator size={16} color={Colors.bg} style={{ alignSelf: "center" }} />
                    ) : (
                      <Text style={styles.generateOTPText}>
                        Upload
                      </Text>
                    )}
                </TouchableOpacity>
              </ScrollView>
            </View>
          </Modal>
        )
      }

      {/* ===========================   Search Result modal     =========================== */}
      {
        open_search_result_modal && (
          <Modal
            animationType="slide"
            transparent
            visible={open_search_result_modal}
            onRequestClose={() => set_open_search_result_modal(false)}
          >
            <View
              style={styles.overlay}
            >
              <View style={{ ...styles.modalContainer, flex: 1, backgroundColor: Colors.bg, padding: 15 }} >
                <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => set_open_search_result_modal(false)}>
                  <Text style={styles.closeText}>close</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, paddingVertical: 30, }} >
                  <FlatList
                    keyboardShouldPersistTaps="handled"
                    data={document_search_result}
                    numColumns={2}
                    renderItem={({ item }: any) => (
                      <View style={{ height: 200, width: "42%", gap: 10, margin: 15, borderWidth: 1, borderColor: Colors.teal, padding: 10, borderRadius: 10 }}>
                        <Image
                          source={{ uri: item.file_url }}
                          style={{ height: 150, width: 100, }}
                          resizeMode='cover'
                        />
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                          <TouchableOpacity>
                            <Text>Preview</Text>
                          </TouchableOpacity>
                          <TouchableOpacity>
                            <Text>Download</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}

                  />

                </View>
              </View>
            </View>
          </Modal>
        )
      }

      {/* ===============================     Main Home Screen     ===================================== */}
      <View style={styles.loginContainer}>
        <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => logout_handler()}>
          <Text style={styles.closeText}>logout</Text>
        </TouchableOpacity>
        <Image
          source={require("../../assets/images/docs.png")}
          style={styles.docsImage}
          resizeMode='cover'
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.generateOTPButton}
          activeOpacity={0.7}
          disabled={upload_document_pressed}
          onPress={() => {
            set_open_upload_modal(true)
          }}
        >
          <Text style={styles.generateOTPText}>
            Upload
          </Text>

        </TouchableOpacity>
        <TouchableOpacity
          style={styles.searchButton}
          activeOpacity={0.7}
          disabled={search_document_pressed}
          onPress={() => {
            set_open_search_modal(true)
          }}
        >
          <Text style={styles.searchText}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeScreen