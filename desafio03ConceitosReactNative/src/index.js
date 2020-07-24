import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, StyleSheet, FlatList, View, Button, TouchableOpacity } from 'react-native'
import { StatusBar } from 'expo-status-bar'

import api from './services/api'

export default function App() {
    const [repositories, setRepositories] = useState([])

    useEffect(() => {
        api.get('repositories').then(response => {
            setRepositories(response.data)
        })
    }, [])

    async function handleAddLike(id) {
        const response = await api.post(`repositories/${id}/like`)

        const likes = response.data.likes

        let cloneRepositories = repositories
        const repositoryIndex = cloneRepositories.findIndex(repository => repository.id === id)
        cloneRepositories[repositoryIndex].likes = likes

        setRepositories([...cloneRepositories])
    } 
   async function handleAddRepository() {
        const response = await api.post(`repositories`, {
            url: `https://github.com/Willian17/aulas`, 
            title: `Novo projeto ${Date.now()}`, 
            techs: `Node.js, React native, React.js`
        } )

        const repository = response.data
        setRepositories([... repositories, repository])
    }

    const RepositoryItem = ({ repository }) => (
        <>
            <View style={styles.repository}>
                <Text style={styles.title}>{repository.title}</Text>
                <Text style={styles.techs}>{repository.techs}</Text>
                <Text style={styles.likes}>{repository.likes} likes</Text>
            </View>
            <Button
                onPress={() => handleAddLike(repository.id)}
                title="Curtir"
                color="#303952"
                accessibilityLabel="Learn more about this purple button"
            />

        </>
    )

    return (
        <>
            <StatusBar style="light" />
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={repositories}
                    keyExtractor={repository => repository.id}
                    renderItem={({ item: repository }) => (
                        <RepositoryItem repository={repository} />
                    )}
                />
                <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.button}
                    onPress={handleAddRepository}
                >
                    <Text style={styles.buttonText}> Adicionar </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1A1A1A',
    },
    repository: {
        marginTop: 30,
        backgroundColor: '#3D3D3D',
        height: 85,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    techs: {
        color: '#b2bec3',
    },
    likes: {
        color: '#ffeaa7'
    },
    button: {
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16
    }

})