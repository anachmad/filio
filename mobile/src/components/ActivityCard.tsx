import React from "react";
import { View, Text, StyleSheet } from "react-native";

type FitrahTag = {
    name: string;
};

type Activity = {
    id: string;
    title: string;
    description: string | null;
    activityDate: string;
    fitrahTags: FitrahTag[];
};

type ActivityCardProps = {
    activity: Activity;
};

const ActivityCard = ({activity}: ActivityCardProps) => {
    return (
        <View style={styles.activityCard}>
            <Text style={styles.activityTitle}>{activity.title}</Text>
            {activity.description && (
                <Text style={styles.activityDescription}>{activity.description}</Text>
            )}
            <Text style={styles.activityDate}>{activity.activityDate}</Text>
            <View style={styles.tagContainer}>
                {activity.fitrahTags.map((tag) => (
                    <View key={tag.name} style={styles.tagChip}>
                        <Text style={styles.tagText}>{tag.name}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    activityCard: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    activityTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    activityDescription: {
        fontSize: 14,
        color: "#666",
        marginVertical: 4,
    },
    activityDate: {
        fontSize: 12,
        color: "#999",
    },
    tagContainer: {
        flexDirection: "row",
        flexWrap: "wrap", 
        marginTop: 8,
    },
    tagChip: {
        backgroundColor: "#e0e0e0",
        borderRadius: 16,
        paddingVertical: 4,
        paddingHorizontal: 12,
        marginRight: 8,
        marginBottom: 8,
    },
    tagText: {
        fontSize: 12,
        color: "#333",
    },
});

export default ActivityCard;