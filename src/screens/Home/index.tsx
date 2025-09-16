import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, Modal, Platform } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DateTimePicker from '@react-native-community/datetimepicker';

import styles from './style'
import { Colors } from '../../globals/Colors'
import { FontSizes } from '../../globals/FontSizes'
import DropDownPicker from 'react-native-dropdown-picker';

const HomeScreen = ({ navigation, route }: any) => {

  const dispatch = useDispatch()

  const store_user_data = useSelector((state: any) => state.main);
  console.log("store_user_data", store_user_data);

  const [open_upload_modal, set_open_upload_modal] = useState(false)
  const [open_search_modal, set_open_search_modal] = useState(false)
  const [upload_document_pressed, set_upload_document_pressed] = useState(false);
  const [search_document_pressed, set_search_document_pressed] = useState(false);

  const [date, set_date] = useState("");
  const [open_upload_date_picker, set_open_upload_date_picker] = useState(false);
  const [selected_category, set_selected_category] = useState(null)
  const [selected_sub_category, set_selected_sub_category] = useState(null);
  const [open_category_dropdown, set_open_category_dropdown] = useState(false);
  const [open_sub_category_dropdown, set_sub_open_category_dropdown] = useState(false);


  const [category_list, set_category_list] = useState([
    { label: "Personal", value: "personal" },
    { label: "Professional", value: "professional" },
  ]);

  const upload_documemnt_handler = async () => {
    try {

    } catch (error) {
      console.log("Error while uploading document =========> ", error)
    }
  };

  const search_documemnt_handler = async () => {
    try {

    } catch (error) {
      console.log("Error while uploading document =========> ", error)
    }
  };

  //   const upload_event_image_handler = async () => {
  //   try {
      
  //     await ImagePicker.openPicker({
  //       width: 300,
  //       height: 400,
  //       // cropping: true,
  //     }).then(async (image: any) => {
  //       let image_to_send = { ...image, imageUri: image.path.startsWith('file://') ? image.path : `file://${image.path}` }
  //     }).catch((err: any) => console.log(err))
  //   } catch (error) {
  //     console.log("Error uploading profile picture ==========>", error)
  //   } finally {
  
  //   }
  // };

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
              <View style={{ ...styles.modalContainer, flex: 1, backgroundColor: Colors.bg, paddingHorizontal: 0 }}>
                <TouchableOpacity style={{ position: "absolute", top: 10, right: 10, zIndex: 1 }} onPress={() => set_open_search_modal(false)}>
                  <Text style={styles.closeText}>close</Text>
                </TouchableOpacity>
              </View>
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
              <View style={{ ...styles.modalContainer, flex: 1, backgroundColor: Colors.bg, padding: 15 }}>
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
                      value={selected_category}
                      items={category_list}
                      disabled={!selected_category}
                      setOpen={set_open_category_dropdown}
                      setValue={set_selected_category}
                      setItems={set_category_list}
                      placeholder="Select sub category"
                      style={styles.dropdown}
                      dropDownContainerStyle={styles.dropdownContainer}
                    />
                  </View>
                </View>
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
              </View>
            </View>
          </Modal>
        )
      }

      {/* ===============================     Main Home Screen     ===================================== */}
      <View style={styles.loginContainer}>
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